// import { serverQueryContent } from '#content/server'
//
// export default eventHandler(async (event) => {
//   // Получаем текущую локаль из параметров запроса или заголовков.
//   // Модуль i18n обычно предоставляет эту информацию.
//   // В данном случае мы можем передавать локаль как query-параметр.
//   const { locale } = getQuery(event)
//
//   if (!locale || typeof locale !== 'string') {
//     // Возвращаем ошибку или данные для локали по умолчанию
//     return []
//   }
//
//   // Формируем путь к контенту на основе локали
//   const contentPath = `/${locale}`
//
//   // Используем serverQueryContent для поиска в контенте определенной локали
//   const sections = await serverQueryContent(event)
//     .where({ _path: new RegExp(`^${contentPath}`) })
//     .find()
//
//   // Важно: на данный момент нет прямого аналога `queryCollectionSearchSections`
//   // для работы с динамическим путем на сервере. Поэтому мы делаем выборку
//   // и можем трансформировать данные в нужный формат, если потребуется.
//   // `UContentSearchButton` ожидает определенную структуру.
//   // Давайте адаптируем данные:
//
//   return sections.map(doc => ({
//     id: doc._path,
//     title: doc.title,
//     text: doc.description || '' // или другой текст для поиска
//   }))
// })
