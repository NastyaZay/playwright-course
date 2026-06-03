export class HomePage {
  constructor(page) {
    // сохраняем объект page, чтобы дальше работать с текущей страницей
    this.page = page;
    // локатор всех тегов справа в блоке Popular Tags
    this.tags = page.locator('button.tag-pill.tag-default');
    // локатор всех карточек статей, которые отображаются в ленте
    this.articles = page.locator('.article-preview');
  }

  async open() {
    // открываем главную страницу сайта
    await this.page.goto('https://realworld.qa.guru/');
  }

  async clickTag(tagName) {
    // кликаем по тегу с нужным названием, например "clamo" или "реклама"
    await this.page.getByRole('button', { name: tagName }).click();
  }

  selectedTagTab(tagName) {
    // находим активный таб, который появляется после клика по тегу
    // например: # clamo
    return this.page.locator('.nav-link.active', { hasText: tagName });
  }
   // теги на конкретной статье
  articleTags(article) {
    return article.locator('ul.tag-list li.tag-default.tag-pill.tag-outline');
  }
  // заголовок первой статьи в ленте
firstArticleTitle() {
  return this.articles.first().locator('h1');
}

// клик по заголовку первой статьи
async openFirstArticle() {
  await this.firstArticleTitle().click();
}
 // находим блок пагинации внизу страницы
pagination() {
  return this.page.locator('.pagination');
}
 // Нажатие на кнопку login
async clickLoginButton() {
  await this.page.getByRole('link', { name: 'Login' }).click();
}

// Локатор количества лайков первой статьи
likeCount() {
  return this.articles.first().locator('button.btn.btn-sm.btn-outline-primary.pull-xs-right span.counter');
}

// Нажатие на кнопку лайка первой статьи
async clickLikeButton() {
  await this.articles.first().locator('button.btn.btn-sm.btn-outline-primary.pull-xs-right').click();
}

// клик по тегу Global Feed
  async clickGlobalFeedTab() {
    await this.page.getByRole('button', { name: 'Global Feed' }).click();
}
}