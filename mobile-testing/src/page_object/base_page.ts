import {$, driver} from '@wdio/globals'

export abstract class BasePage {
  protected MEDIUM_TEIMOUT = 5000;
  protected LONG_TIMEOUT = 10000;
  protected VERY_LONG_TIMEOUT = 20000;
  
  private  get robotImgs() {
    return $('android=new UiSelector().className("android.widget.ImageView").instance(0)')
  }

  public async backToDashboard(
    maxBack: number = 5,
    waitMs: number = 500,
  ): Promise<void> {
    for (let i = 0; i < maxBack; i++) {
      if (await this.robotImgs.isDisplayed()) {
        return;
      }
      
      await driver.back();
      await driver.pause(waitMs)
      
    }
    
    throw new Error('Failed to back to dashboard');
  }
}
