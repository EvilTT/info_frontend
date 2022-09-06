//TODO React testing library
//* render(<Component/>) - рендерит компонент
//? screen() - посик по экрану
//! screen.debug() - выводит в консоль разметку компонета для отладки 
//* toBeInTheDocument - отрендерился ли компонент 
//*--- getByText(text) - поиск текста 
//*--- getByRole(list(список), listitem(элемент списка) и тд.) - поиск по роли
//*--- querry... - если элемента нет, вернет null а не ошибку как getBy... 
//* toHaveStyle({style}) - наличия стилей на элементе 
//! find... - используется для асинхронных тестов, возвращает Promise 
//! fireEvent.event(elem, {options}) - спеиальный объект для емуляции событий, простого click без нажатий и т.д
//! useEvent.event(elem, {options}) - полное эмулирование событий, при клике генерится mousdown и mouseup и т.д