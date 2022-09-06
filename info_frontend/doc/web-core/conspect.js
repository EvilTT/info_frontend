// --------------------------------------------------------------------------------------------

//TODO----------------------------------------HTTP Core---------------------------------------------------------
//!--------------------------------------База
//* HTTP - протокол (7 уровня) для передачи гипертекствовой информации, использующий клиент-серверную модель(архитектуру). Клиент отправляет запросы при момощи HTTP методов, сервер отвечает с использование HTTP кодов ответа. HTTP достаточно прост для понимания, следует принципу KISS, под собой использует TCP.
//* не имеет состояния, но имеет сессию, используя coccie мы можем сохранть состояние
//! HTTPS
//* Расширеная версия HTTP протокола. Использует криптографическое шифрование с использованием протоколов SSL - старый и TSL - новый (стандарт)
//! HTTP Методы запросов
//* GET - используется для запроса данных (получения)
//* HEAD - запрашивает заголовки , которые были бы возвращены, если бы URL-адрес запроса был запрошен методом GET. Аналог GET но без тела ответа.
//* POST - используется для отправки данных.
//* PUT - используется для обновления данных, полной замены ресурса
//* PATCH - используется для частичного обновления ресурса
//* DELETE - используется для удаления указанного ресурса

//* CONNECT - Преобразует соединение запроса в прозрачный TCP/IP-туннель, обычно чтобы содействовать установлению защищённого SSL-соединения через нешифрованный прокси.
//* OPTIONS - используется для описания параметров взаимодействия с ресурсом (используется при CORS)
//* TRACE - используется для проверки работоспособности запришваемого ресурса

//! HTTP Коды ответов
//* 100-199 - информационные (WebSocket)
//* 200-299 - успешные
//* 300-399 - перенаправления
//* 400-499 - клентские ошибки
//* 500-599 - серверные ошибки

//! HTTP Заголовки
//* Заголовки позволяют клиенту и серверу отправлять дополнительную информацию для взаимодействия между клиентом и сервером, формат - разделеное двоеточием пара (имя : значение)
//* Authorization - данные аутентификации, SetCocie - куки установление на сервере, Coccie - куки с браузера, Content-type - тип/кодироввка (text/html;charset=utf-8), Content-lenght - Длинна данных.

//! CORS
//* <CORS>: Cross-Origin Resource Sharing («совместное использование ресурсов между разными источниками»).
//* источник - комбинация домен/порт/протокол

//* Для запроса на другой источник браузер ставит заголовок Origin: источник, если успешно сервер ответит заголовком Access-Control-Allow-Origin: источник/*
//? ПРОСТЫЕ ЗАПРОСЫ
//* По умолчанию при запросе к другому источнику можно получить доступ только к простым заголовкам - Content-Language, Content-Type, Last-Modified и т.д, всего их 6, для доступа к другим сервер должен ответить заголовком Access-Control-Expose-Headers: Headers
//* Доступные методы для простого запроса - GEt/POST/HEAD

//? НЕПРОСТЫ ЗАПРОСЫ
//* Для непростого запроса (PUTCH, PUT, DELETE ..) - браузер посылает предварительный OPTIONS запрос без тела но с заголовкаим - Access-Control-Request-Method: HTTP метод непростого запроса, Access-Control-Request-Headers: Список непростых HTTP заголовков.
//* Сервер отвечает на такое при успехе заголовками Access-Control-Allow-Methods: Разрешеные методы, Access-Control-Allow-Headers: разрешеные заголовки. Также может быть Access-Control-Max-Age: кол-во секунд для кеширования разрешения, что бы браузер не посылал предзапрос каждый раз.

//? Для запросов с авторизационными данными (cockie, Auth Headers)
//* Сервер должен установить Access-Control-Allow-Origin в то же значение, что и Origin (* - здесь не прокати) и Access-Control-Allow-Credentials в true (в fetch crenedtials: 'true', axios - withCredentials: true)

//! WebSocket
//* WebSocket - это протокол обеспечивающий обмен данными между пользователем и сервером через постоянное соединение
//* class WebSocket(url, [подпротоколы]) - в url должен быть установлен специальный протокол ws(аналог HTTP) - не зашифрованные данные, wss(аналог HTTPS). Вторым аргументом принимает массив подпротоколов, например SOAP WAMP

//* Поток данных в websocket состоит из фреймов, отправлять мы можем только текстовые и бинарыне данные, .binaryType - указывает формат принимаемых бинарных данных (default "blob")
//* WebSocket буферизирует данные и отправляет с доступной скоростью, bufferedAmoun - хранит кол-во байт буферизированных данных
//* Чтобы узнать состояние соединения readyState, он может быть:
//* 0 - «CONNECTING»(соединение еще не установленно), 1 - «OPEN»(обмен данными), 2 - «CLOSING»(соединение закрывается), 3 - «CLOSED»(соединение закрыто)

//* После создания сокета на его insatnce генерируются следующие события
//*"open" - соединение установленно, "message" - получены данные, "error" - ошибка "close" - соединение закрыто
//* методы: send(data) - отправить данные, close([code], [reason]) - закрыть соединение, code - специальный код закрытия (default 1000), reason - причина закрытия.

//* После создания WebSocket он автоматически пытается установить соединения при помощи специальных заголовков:
//* С клиента - Sec-WebSocket-Key(случайный ключ созданный браузером для безопасности), Sec-WebSocket-Version(версия протокола), Connection: Upgrade(изменение протокола), Upgrade: websocket(запрос протокола websocket)
//* Ответ с сервера (со статусом 101) - Sec-WebSocket-Accept(перекодированный Sec-WebSocket-Key) и Connection: Upgrade, Upgrade: websocket

//! HTTP Кэширование
//* Используется для повышения производительности путем повторного использования ранее запрашиваемыъ ресурсов
//* Есть два типа кеша - shared(кэш совместного использования) и private (браузер)
//* shared - В кешах совместного использования хранятся копии, которые могут направляться разным пользователям.
//* private = Приватный кеш предназначен для отдельного пользователя
//* Кэши = браузер, прокси, CDN, шлюзы, реверсные кэши, балансировщики
//* Управление кешем происходит засчет заголовков Cache-Control - используется для задания инструкций по управленмю кешем
//* no-cache, no-store, must-revalidate - Полное отсутсвие кешированя
//* no-cache - кэшировать но проверять актуальность
//* privet - указывает, что ответ предназначен отдельному пользователю, public - указывает, что твет можно сохранять вл юбом кеще
//* max-age=second - максимальное время, в течение которого ресурс считается "свежим"
//* must-revalidate - кеш обязан проверять статус ресурсов с истёкшим сроком действия. Те копии, что утратили актуальность, использоваться не должны

//! Прокси
//* Прокси это посредник между клиентом и запрашиваемым ресурсом. VPN лучше и безопаснее но дороже.
//* Используются для - конфединцеальность, безопасность, для доступа по локации, доступ к заблокированным ресурсам, фильтрации трафика, сжатия данных, кэширование.
//* Типы прокси: Прозрачные - сообщает что он прокси и ваш IP (публичные заведения). Анонимные - сообщает что он прокси но не передает чиные данные. Искажающие - идентифицируют себя честно, но вместо реальных данных пользователя передают подставные. Приватные - регулярно меняют IP и постоянно выдают фальшивые данные

//! Этапы отрисовки старницы страницы в браузере
//* Пример, ввода запроса в адресную строку ->
//* DNS || Если ранне такого запроса не было (не было зазода по данному url) то браузер запросит DNC запись IP (имя сервера будет преобразованно в IP). Ответ на запрос временно закешируется в кэше устройства (не всегда).  DNS запросы должны быть выполнены для каждого уникального имени хоста, который запрашивается страницей. Скажем, если ваши шрифты, картинки, скрипты, реклама или счётчики аналитики находятся на разных доменах, DNS запрос будет осуществлён для каждого из них
//* TCP || Когда браузер получил IP просиходит TCP соединение, через HTTP/HTTPS (два устройства обмениваются параметрами прежде чем установить соединение, через 3 сообщения "SYN-SYN-ACK").
//? 14kb || Первый TCP ответ не может быть больше 14kb, далее размер увеличивается x2. Это сделанно что бы избежать переполения и потери данных. При каждом получении данных браузер отправляет ответ (называемый Aknowledgements ). Если такой ответ не придет сервер отправит данные заного.
//* TLS || Если используется HTTPS, то происходит еще одно соединение, определяется шифр, удостоверяется надежность сервера.
//* После установки соединения браузер выполняет GET запрос запрашивая HTML:
//* Parsing || Получая первый HTML, начинается парсинг - преобразование полученныъ байт документа в DOM-дерево. Браузер создает новый запрос когда находит ссылки на внешние ресурсы, некоторые блокируют (пока такие запросы выполняются, другие ждут, js блокирует, css не блокирует но блакирует JS, так как ему нужен доступ к css selector). Парсинг продолжается до тех пор, пока запрос на получение HTML не подойдет к концу.
//? В браузерах есть специальный сканер который находит и загружает высокоприоритетные ресурсы, до токо как парсер дойдет до них, но это не всегда так (CSS, JavaScript и шрифты)
//* CSSOM || Несет в себе все стили, похож на DOM. Построение CSSOM блокирует рендер, т.к правила могут быть переиспользованны и нужно дождаться построение CSSOM.
//? Сложные селекторы требуют больше времени, но они не стоят оптимизации, т.к пстроение CSSOM быстрое, лучше замерить время а потом решать.
//! AOM || Accessability Object Model Построение дерева доступности, AOM - семантическая версия DOM пока оно не построено у страницы нет доступа к голосовым помошникам и считывателем экрана.
//* Render tree || Комбинация DOM и CSSOM и построение Render tree - каждому узлу (Node) присваиваются вои правила. Обрабатываются только видемые Node. (head или display: none ).
//* Layout (Компоновка) || После построения Render tree происходит Компоновка - этот этап определяет, где и как на странице будут спозиционированы элементы и каковы связи между элементами.
//? meta viewport - определяет ширину видмой области (по умолчанию в барузерах 960px)
//* Paint (Отрисовка) || Процесс отрисовки пикселей на экране (быстрый процесс). При первоначальной загрузке (onload event) происходит отрисовка всего экрана. Далее только изменяющихся частей, так браузер оптимизирует процесс.
//* JS || Просиходит после onload, строится AST --> преобразуется в байт-код --> исполняется в основном потоке. при обработке скриптов браузер не может обрабатывать событие. TTI (Time to interactive) - показатель, сколько времени проходит между 1 сетевым запросом и временем до интерактивности.

//! Метрики производительности
//* TTFB - (Time to first byte) - время от начала запроса (клика на ссылку) до прихода 1 байта документа
//* TTI (Time to Interactive) - время от первого GET запроса до интерактивности страницы (до окончания обработки скриптов JS)
//* FP (First paint)- время до отрисовки первого пикселя, который становится виден пользователю
//* FCP (First contentful paint) - время до отрисовки запрашиваемого контента

//! SSR/CSR/SSG
//* CLS (Client Site Rendering) - рендеринг на стророне к клиента (в браузере, React, Vue, Angular)

//* SSG (Server Site Generator) - генератор статических сайтов, то есть все страницы создаются при сборке, работает быстро и очень хорош для SEO. Минусы нет интерактивности (что бы обновить данный нужно пересобирать приложение и т.д), но можно исполлзовать serverless. (Gatsby JS), часто реализуют при помощи JAMStack (JS, API, Markup)

//* SSR (Server Site Rendering) - Это рендеринт HTML страниц на стороне сервера, при каждом переходе на новый url отправляется запрос на сервер который отдает HTML (Next JS), лучше для мобилок т.к им нужно меньше нагружаться при парсинге JS.
//* SSR используют для SEO (Seacrh engine optimization) - т.к при CSR приходит пустой HTML присковым роботам сложно его индексировать, а при SSR приходит уже наполненый HTML что отлично работает с SEO.
//* Уменьшения времени FCP и FB, чем раньше пльзователь увидит что-то тем лучше, т.к станица уже придет напоненой и не нужно дожидаться TTI (парсинга и запуска JS)
//* Landing Page - удобно применять SEO т.к страницы не интерактивные и в основном это продающие сайты, для которых первое отображение влияет на продажи. Если landing будет долго загружаться то пользователь уйдет и бизнет потеряет клиента.
//* Отслеживание трафика удобно применять к SSR т.к запрос происходит при каждом смене url

//! VPN
//! DNS (Domain Name System)
//* Хранит IP адресс эквивалентный доменному имени. При отправке запросов, запросы отправляются по домену, это сделанно для удобства. запоминать IP сложнее чем домен. Так же он хранит (кеширует) эти данные для дальнейших запросов на DNS сервере, обычно их 2 первичный и вторичный, но может быть и больше для повышения надежности, откажет один доступен другой.

//! IP
//* IP - по стандарту IPv4 - это 4 числа длинной от 0 до 255, они обозначают число обслуживаемых пользователей (компьютеров и т.д). По стандарту IPv6 6 чисел.

//! TCP/UDP
//* Протоколы транспортного уровня
//* TCP (Transmission Control Protocol) - сложный, требует достаточное кол-во времени для отправки сообщений серверу для установки канала передачи,но гарантирует достувку пакетов. Из-за механизма, реализующего гарантированную доставку пакетов, требует времени.
//* UDP (User Datagram Protocol) - быстрый протокол, но он не гарантрует доставку пакетов. (стримы, постоянные потоки данных)

//TODO-----------------------------------------------Безопасность------------------------------------------------------------
//! CSRF
//* CSRF (Cross-site request forgery) - межсайтовая подделка запроса
//* HEAD, OPTION, TRASE, GET - не подвержены этой атаке т.к используються только для получения информации и не изменяют состояние сервера
//* POST, PUT, TRACE, DELETE - дллжны быть защищены от нее
//* SameSite , Strict - , Lax

//! XSS
//* XSS (Cross-Site Scripting) — «межсайтовый скриптинг», внедрени JS кода на сайт, для переадресации, получения авторизаионных данных и т.д. React защищет от этого при транспеляции JSx в специальные объекты при помощи babel, он экранирует все значения включенные в JSxперед рендером, превращая их в строки, тем самым защищая от XSS атак.

//TODO------------------------------------------------Микросервисы------------------------------------
//! Плюсы
//* независимость от языков разработки
//* горизонтальное маштабирование - возможность поднять еще сервера, облака и там запустить сервисы
//* отказоустойчивость (можно поднимать копии сервисов cubernetis например)
//* переиспользуемость
//* удобство в разработке (1 команда 1 сервис)
//* независимый deploy, внедрение фич происходит быстрее

//! Минусы
//* Сложно согласовывать данные
//* Это дорого в разработке т.к сложно
//* Сложность в разработке (CI\CD, версионирование, аркестрирование событий, логирование)

//! Когда использовать
//* Если большая нагрузка, есть или будет
//* Если большая команда
//* Если нужна отказоустойчивость для бизнеса
//* Нужна быстрота обновления фич

//! Условия для применения
//* Разбиение на микросервисы должно быть не по бихнес-логике (смс оповещения, email, платеж, логи)
//* Взаимодействие между микросервисами может происходить синхронно REST или (стандарт) асинхронно с помощью event, по протоколам AMQP (RebbitMQ - Брокер для ивентов). Каждый микросервис значет что ему делать по какому либо event.
//* Для общения с фронто используется ApiGetway - точка входа, для клиента, админки, mobile, в ней должно быть мало логики или совсем нет.
//* микросервисы должны быть слабосвязанный между собой
//* у каждого микросервиса должна быть своя БД