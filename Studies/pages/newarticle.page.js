export class NewArticlePage {
  constructor(page) {
    this.page = page;

    // локатор кнопки Publish Article
    this.publishArticleButton = page.getByRole("button", {
      name: "Publish Article",
    });

    // локатор ошибки, если заголовок уже существует
    this.titleAlreadyExistsError = page.getByText("Title already exists..");

    // локатор кнопки Publish Article
    this.UpdateArticleButton = page.getByRole("button", {
      name: "Update Article",
    });
  }

  async open() {
    await this.page.goto("https://realworld.qa.guru/#/editor");
  }

  async clickPublishArticle() {
    await this.publishArticleButton.click();
  }

  async clickUpdateArticleButton() {
    await this.UpdateArticleButton.click();
  }
}
