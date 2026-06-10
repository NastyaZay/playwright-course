export class HomePage {
  constructor(page) {
    this.page = page;

    // локатор всех карточек статей, которые отображаются в ленте
    this.articles = page.locator(".article-preview");

    // локатор кнопки Login в шапке сайта
    this.loginButton = page.getByRole("link", { name: "Login" });

    // локатор таба Global Feed
    this.globalFeedTab = page.getByRole("button", { name: "Global Feed" });

    // локатор блока пагинации внизу страницы
    this.paginationBlock = page.locator(".pagination");

    // локатор первой статьи в ленте
    this.firstArticle = this.articles.first();

    // локатор заголовка первой статьи
    this.firstArticleTitleLink = this.firstArticle.locator("h1");

    // локатор кнопки New Article в шапке сайта
    this.newArticleButton = page.getByRole("link", { name: "New Article" });

    // открыть выпадающее меню пользователя
    this.userMenuToggle = this.page.locator(".nav-item.dropdown .nav-link");

    // пункт Logout в выпадающем меню
    this.logoutLink = this.page.getByRole("link", { name: "Logout" });

    // пункт Settings в выпадающем меню
    this.SettingsLink = this.page.getByRole("link", { name: "settings" });
  }

  // методы
  async open() {
    // открываем главную страницу сайта
    await this.page.goto("https://realworld.qa.guru/");
  }

  firstArticleTitle() {
    // возвращаем локатор заголовка первой статьи в ленте
    return this.firstArticleTitleLink;
  }

  pagination() {
    // возвращаем локатор блока пагинации внизу страницы
    return this.paginationBlock;
  }

  async clickLoginButton() {
    // нажимаем на кнопку Login
    await this.loginButton.click();
  }

  async clickGlobalFeedTab() {
    // кликаем по табу Global Feed
    await this.globalFeedTab.click();
  }

  async clickNewArticle() {
    // нажимаем на кнопку New Article
    await this.newArticleButton.click();
  }

  // нажимаем на меню пользователя
  async openUserMenu() {
    await this.userMenuToggle.click();
  }

  //нажимаем на пункт Logout
  async logout() {
    await this.logoutLink.click();
  }

  //нажимаем на пункт Settings
  async Settings() {
    await this.SettingsLink.click();
  }
}
