export class HomePage {
  constructor(page) {
    this.page = page;

    // локаторы главной страницы
    this.articles = page.locator(".article-preview");
    this.firstArticle = this.articles.first();
    this.firstArticleTitleLink = this.firstArticle.locator("h1");
    this.paginationBlock = page.locator(".pagination");
    this.globalFeedTab = page.getByRole("button", { name: "Global Feed" });

    // локаторы авторизации
    this.loginButton = page.getByRole("link", { name: "Login" });
    this.signInHeading = page.getByRole("heading", { name: "Sign in" });
    this.emailInput = page.getByPlaceholder("Email");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginSubmitButton = page.getByRole("button", { name: "Login" });
    this.yourFeedButton = page.getByRole("button", { name: "Your Feed" });

    // локаторы пользователя
    this.newArticleButton = page.getByRole("link", { name: "New Article" });
    this.userMenuToggle = page.locator(".nav-item.dropdown .nav-link");
    this.logoutLink = page.getByRole("link", { name: "Logout" });
    this.settingsLink = page.getByRole("link", { name: "Settings" });
  }

  async open() {
    await this.page.goto("https://realworld.qa.guru/");
  }

  getFirstArticleTitle() {
    return this.firstArticleTitleLink;
  }

  getPagination() {
    return this.paginationBlock;
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginSubmitButton.click();
  }

  async clickGlobalFeedTab() {
    await this.globalFeedTab.click();
  }

  async clickNewArticle() {
    await this.newArticleButton.click();
  }

  async openUserMenu() {
    await this.userMenuToggle.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async openSettings() {
    await this.settingsLink.click();
  }

  getUserName(name) {
    return this.page.getByText(name);
  }
}
