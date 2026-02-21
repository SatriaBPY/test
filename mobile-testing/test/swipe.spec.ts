import SwipePage from "../src/page_object/swipe_page";
import DashboardPage from "../src/page_object/dash_board";

describe('Swipe Page Feature', () => {
  it('Should display Dashboard page successfully', async () => {
    await DashboardPage.pages();
  })

  it('Should navigate from Dashboard to Swipe Page', async () => {
    await DashboardPage.menuItems('swipe');
    await SwipePage.pages();
  })
  
  it('Should capture current carousel card before swipe', async () => {
    await SwipePage.beforeSwipe();
   
  })
  
  it('Should swipe carousel to the left', async () => {
     await SwipePage.swipeToLeft();
   
  })
  
  it('Should verify carousel displays next card after swipe', async () => {
    await SwipePage.afterSwipe();
  })
  
  it('Should capture current carousel card before swipe', async () => {
    await SwipePage.beforeSwipe();
   
  })
  
  it('Should swipe carousel to the left', async () => {
     await SwipePage.swipeToLeft();
   
  })
  
  it('Should verify carousel displays next card after swipe', async () => {
    await SwipePage.afterSwipe();
  })
  
})
