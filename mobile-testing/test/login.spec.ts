import DashboardPage from '../src/page_object/dash_board'
import LoginPage from '../src/page_object/login_page'


describe('Login Test', () => {
  it('User in Dashboard Page', async () => {
    await DashboardPage.pages();
  })
  
  it('User navigate to Login Page', async () => {
    await DashboardPage.menuItems('login');
    await LoginPage.pages();
  })
  
  it('User login with valid credentials', async () => {
    await LoginPage.login('test@example.com', 'password');
  })
  
  it('Success message must be displayed', async () => {
    await LoginPage.loginValidation('Success');
  })
  
  it('Success logged in message must be displayed', async () => {
    await LoginPage.loginValidation('Youare Logged in');
  })
  
  it('User must be able to tap "OK" button', async () => {
    await LoginPage.tapOkbtn();
  })
  
})