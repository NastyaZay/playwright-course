import { expect } from "@playwright/test";

export class SettingsPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.getByPlaceholder("Your Name");
    this.emailInput = page.getByPlaceholder("Email");
    this.passwordInput = page.getByPlaceholder("Password");
    this.updateSettingsButton = page.getByRole("button", {
      name: "Update Settings",
    });
  }

  async open() {
    await this.page.goto("https://realworld.qa.guru/#/settings");
  }

  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickUpdateSettings() {
    await expect(this.updateSettingsButton).toBeVisible();
    await this.updateSettingsButton.click();
  }
}
