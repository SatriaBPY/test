import { BasePage } from "./base_page";
import { $ } from '@wdio/globals'
import { tap, waitForElementVisible } from "../helper/command";

const menus = {
  home: 'Home',
  webview: 'Webview',
  login: 'Login',
  forms: 'Forms',
  swipe: 'Swipe',
  drag: 'Drag'
} as const

class DashboardPage extends BasePage {
  get robotImg() {
    return $('android=new UiSelector().className("android.widget.ImageView").instance(0)')
  }
  
  get homeMenu() {
    return $('~Home')
  }
  
  get webviewMenu() {
    return $('~Webview')
  }
  
  get loginMenu() {
    return $('~Login')
  }
  
  get formsMenu() {
    return $('~Forms')
  }
  
  get swipeMenu() {
    return $('~Swipe')
  }
  
  get dragMenu() {
    return $('~Drag')
  }
  
  async pages() {
    await this.robotImg.waitForDisplayed({ timeout: 5000 })
  }
  
  async menuItems(menuKey: keyof typeof menus) {
    await waitForElementVisible(this.robotImg)
    
    switch (menuKey) {
      case 'home': 
      await tap(this.homeMenu)
      break;
      case 'webview': 
      await tap(this.webviewMenu)
      break;
      case 'login': 
      await tap(this.loginMenu)
      break;
      case 'forms': 
      await tap(this.formsMenu)
      break;
      case 'swipe': 
      await tap(this.swipeMenu)
      break;
      case 'drag': 
      await tap(this.dragMenu)
      break;
      default:
        throw new Error(`Invalid menu key: ${menuKey}`)
    }
  }
}

export default new DashboardPage();