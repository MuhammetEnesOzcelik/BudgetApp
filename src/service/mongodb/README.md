### PivotHelper (`pivot.helper.ts`)

PivotHelper, MongoDB/Mongoose aggregate pipeline üretimi için yeniden kullanılabilir yardımcı bir sınıftır. Varyant ürünleri seçilen bir özellik (pivot attribute) üzerinden pivot tablo benzeri satır/küme çıktıları oluşturur ve aynı anda temel (BASIC) ürünleri de tekil satırlar olarak birleştirir. Çıktı, sayfalama ve sıralama destekler; hem varyant hem de basic yoluna ek projeksiyonlar/lookup aşamaları enjekte edilebilir.

---

### Ne İşe Yarar?

- **Normalize eder**: `item` alanı ObjectId ya da gömülü doküman olabilir; önce gerçek `item` dokümanına normalize eder ve `__itemType` (VARIANT/BASIC) hesaplar.
- **Varyantları pivotlar**: Pivot attribute (örn. renk) için, satırları diğer varyant belirleyici attribute terimlerinden (örn. beden, materyal) türeyen bir `rowKey` ile gruplayıp pivot kolon (pivot attribute) bazında birleştirir.
- **Basic ürünleri dahil eder**: BASIC öğeleri aynı satır şemasına projekte eder; tek çıktıda birleştirir.
- **Esnek gruplama/akümülatörler**: Varyant seviyesinde ve satır seviyesinde özelleştirilebilir gruplama ve akümülatör alanları sağlar.
- **Sayfalama ve sıralama**: `limit`, `offset`, `sort` desteklenir ve sonuç `data`+`meta.totalCount` ile döner.

---

### Ana API

```ts
PivotHelper.buildPivotByAttributePipeline(options: FindPivotByAttributePipelineOptions): PipelineStage[]
```

Bu API, tek bir aggregate pipeline döndürür. Tipler:

```ts
interface FindPivotByAttributePipelineOptions {
  pivotAttributeId: Types.ObjectId; // Attribute to pivot by (e.g., color)
  limit: number; // Pagination limit
  offset: number; // Pagination offset
  itemFieldName?: string; // Source item field name (default: 'item')
  match?: Record<string, any>; // Initial $match (raw conditions)
  filter?: Record<string, any>; // Filter processed via MongoFindHelper.processFilter
  sort?: Record<string, SortOrder>; // Final flat result $sort
  stagesBeforeProjections?: PipelineStage[]; // Stages injected before final projections on both paths
  groupingOptions: GroupingOptions; // Grouping/accumulator options
  projectionOptions: ProjectionOptions; // Final projection extensions
}

interface GroupingOptions {
  variantLevelIdExtra?: Record<string, any>; // Extra fields for variant-level $group _id
  variantLevelAccumulators?: PipelineStage; // Variant-level accumulators (e.g., sum of quantity/amount)
  additionalRowLevelGroupingId?: Record<string, string>; // Extra fields for row-level $group _id
  variantRowLevelAccumulators?: PipelineStage; // Row-level accumulators (aggregated from variants)
  basicRowLevelAccumulators?: PipelineStage; // Currently not directly used in basic path (for extension)
}

interface ProjectionOptions {
  additionalVariantPathProjection?: Record<string, any>; // Final $project extensions for variant path
  additionalBasicPathProjection?: Record<string, any>; // Final $project extensions for basic path
}
```

---

### Veri Varsayımları

- Kaynak koleksiyonda bir `item` alanı vardır (adı `itemFieldName` ile değiştirilebilir) ve bu alan ObjectId veya gömülü item dokümanı olabilir.
- Item dokümanları `eim-items` koleksiyonundadır; attribute terimleri `eim-attribute-terms` koleksiyonundan okunur.
- Varyant item'larda `item.properties[].attribute` ve `terms[]` yapısı bulunur. Pivot işlemi, her property'nin ilk term'ini kullanır.

---

### Çıktı Şeması (özet)

- `data`: Düzleştirilmiş satırlar dizisi. Varsayılan alanlar:
  - `item`: `{ id, name, unit }` (ebeveyn ürün düzeyinde)
  - `rowKey`: Diğer varyant belirleyici attribute terimlerinden türetilmiş anahtar (sıralı, `-` ile birleştirilmiş)
  - `rowTerms`: Satırdaki diğer attribute terimlerinin `{ termId, name }` bilgileri
  - Ek alanlar: `projectionOptions` ve akümülatörler ile siz belirlersiniz (örn. `amount`, `quantity`, `pivotedQuantities` vb.)
- `meta`: `{ totalCount }` içeren tek elemanlı dizi

---

### Örnek Kullanım

```ts
import { Types } from 'mongoose';
import { PivotHelper } from '@service/mongo/pivot.helper';

const pipeline = PivotHelper.buildPivotByAttributePipeline({
  pivotAttributeId: new Types.ObjectId('<COLOR_ATTRIBUTE_ID>'),
  limit: 25,
  offset: 0,
  itemFieldName: 'item',
  match: { priceList: new Types.ObjectId('<PRICE_LIST_ID>') },
  sort: { 'item.name': 1 },
  groupingOptions: {
    // Varyant seviyesinde ek _id alanları (opsiyonel)
    variantLevelIdExtra: { warehouse: '$warehouse' },

    // Varyant seviyesinde toplanacak alanlar
    variantLevelAccumulators: {
      quantity: { $sum: '$quantity' },
      amount: { $sum: '$amount' },
    } as any,

    // Satır (row) seviyesinde ek _id alanları (hem varyant hem basic yolunda kullanılır)
    additionalRowLevelGroupingId: { priceList: '$priceList' },

    // Satır seviyesinde nihai birleştirilmiş akümülatörler
    variantRowLevelAccumulators: {
      pivotedQuantities: {
        $push: {
          variantId: '$_id.variant',
          termId: '$_id.pivot',
          quantity: '$quantity',
          amount: '$amount',
        },
      },
      quantity: { $sum: '$quantity' },
      amount: { $sum: '$amount' },
    } as any,
  },
  projectionOptions: {
    additionalVariantPathProjection: {
      pivotedQuantities: 1,
      quantity: 1,
      amount: 1,
    },
    additionalBasicPathProjection: {
      quantity: 1,
    },
  },
});

// Mongoose ile çalıştırma örneği
const result = await this.priceListLineEntity.aggregate(pipeline);
// result => { data: [...], meta: [{ totalCount: N }] }
```

---

### İpuçları ve Sınırlamalar

- **item normalizasyonu**: `item` alanı ObjectId ise lookup ile doküman çekilir; gömülü ise doğrudan kullanılır.
- **Tip tespiti**: `__itemType`, `item.type` yoksa heuristik ile (properties veya parentId varlığı) belirlenir.
- **Pivot term seçimi**: Her property için ilk term alınır. Çoklu term senaryolarında ek mantık enjekte etmek için `stagesBeforeProjections` kullanın.
- **Dil/Çeviri**: Bu helper isimleri doğrudan `eim-items`/`eim-attribute-terms` dokümanlarından çeker. Gelişmiş çok-dilli projeksiyonlar gerekiyorsa, kendi language-aware projeksiyonunuzu `stagesBeforeProjections` ile ekleyin.
- **basicRowLevelAccumulators**: Şu an temel yol içinde doğrudan tüketilmez; basic yol projeksiyonunu genişletmek için `additionalBasicPathProjection` kullanın.

---

### İlgili

- `src/domain/sdm/submodules/plm/repository/pipeline/price-list-line-item-pivot-by-attribute.pipeline.ts`: Fiyat listesi satırları için benzer pivot ihtiyacını karşılayan alan-özel pipeline örneği.
