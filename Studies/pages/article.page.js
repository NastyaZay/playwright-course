export class ArticlePage {
  constructor(page) {
    this.page = page;

    this.articleTitle = page.getByRole("heading", { level: 1 });
    this.articleText = page.locator(".article-content p");
    this.articleTags = page.locator(".tag-list .tag-pill");

    this.deleteArticleButton = page
      .getByRole("button", { name: "Delete Article" })
      .first();

    this.editArticleButton = page
      .getByRole("button", { name: "Edit Article" })
      .first();
  }

  async clickDeleteArticle() {
    await this.deleteArticleButton.click();
  }

  async clickEditArticle() {
    await this.editArticleButton.click();
  }
}
