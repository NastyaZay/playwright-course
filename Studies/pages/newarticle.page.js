export class NewArticlePage {
  constructor(page) {
    this.page = page;

    this.articleTitleInput = page.getByPlaceholder("Article Title");
    this.articleDescriptionInput = page.getByPlaceholder(
      "What's this article about?",
    );
    this.articleBodyInput = page.getByPlaceholder(
      "Write your article (in markdown)",
    );
    this.articleTagInput = page.getByPlaceholder("Enter tags");

    this.publishArticleButton = page.getByRole("button", {
      name: "Publish Article",
    });

    this.updateArticleButton = page.getByRole("button", {
      name: "Update Article",
    });

    this.titleAlreadyExistsError = page.getByText("Title already exists..");
  }

  async open() {
    await this.page.goto("https://realworld.qa.guru/#/editor");
  }

  async fillArticleTitle(title) {
    await this.articleTitleInput.fill(title);
  }

  async fillArticleDescription(description) {
    await this.articleDescriptionInput.fill(description);
  }

  async fillArticleBody(body) {
    await this.articleBodyInput.fill(body);
  }

  async fillArticleTag(tag) {
    await this.articleTagInput.fill(tag);
  }

  async fillArticleForm(article) {
    await this.fillArticleTitle(article.title);
    await this.fillArticleDescription(article.description);
    await this.fillArticleBody(article.body);
    await this.fillArticleTag(article.tag);
  }

  async clickPublishArticle() {
    await this.publishArticleButton.click();
  }

  async clickUpdateArticleButton() {
    await this.updateArticleButton.click();
  }
}
