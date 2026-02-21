import DashboardPage from "../src/page_object/dash_board";
import FormPage from "../src/page_object/form_page";


describe('Form Page Feature', () => {

  it('Should display Dashboard page successfully', async () => {
    await DashboardPage.pages();
  })

  it('Should navigate from Dashboard to Form page', async () => {
    await DashboardPage.menuItems('forms');
    await FormPage.pages();
  })

  it('Should allow user to input text in the input field', async () => {
    await FormPage.inputText('Test the input')
  })

  it('Should display the same text that was entered', async () => {
    await FormPage.validateInput('Test the input');
  })

  it('Should turn the switch ON when toggled', async () => {
    await FormPage.tapSwitch('ON')
  })

  it('Should display switch status as ON', async () => {
    await FormPage.verifySwitchStatus('ON')
  })

  it('Should turn the switch OFF when toggled', async () => {
    await FormPage.tapSwitch('OFF')
  })

  it('Should display switch status as OFF', async () => {
    await FormPage.verifySwitchStatus('OFF')
  })

  it('Should allow user to select an option from dropdown', async () => {
    await FormPage.selectOptionDropdowon('thisapp');
  })

  it('Should display the correct dropdown selection result', async () => {
    await FormPage.verifyDropdown();
  })

  it('Should activate the active button when tapped', async () => {
    await FormPage.activeBtn();
  })

  it('Should display confirmation after active button is tapped', async () => {
    await FormPage.verifyActiveBtn();
  })

  it('Should confirm action when OK button is tapped', async () => {
    await FormPage.tapOkActvBtn();
  })

})
