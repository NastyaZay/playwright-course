export class ArticlePage {
  constructor(page) {
    this.page = page;

    // заголовок статьи
    this.articleTitle = page.getByRole("heading", { level: 1 });

    // абзацы текста статьи
    this.articleText = page.locator(".article-content p");

    // теги статьи
    this.articleTags = page.locator(".tag-list .tag-pill");

    // кнопка удаления статьи
    this.DeleteArticle = page
      .getByRole("button", { name: "Delete Article" })
      .first();

    //кнопка редактирования статьи
    this.EditArticle = page
      .getByRole("button", { name: "Edit Article" })
      .first();
  }
  async clickDeleteArticle() {
    await this.DeleteArticle.click();
  }

  async clickEditArticle() {
    await this.EditArticle.click();
  }
}
