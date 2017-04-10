import { CodependencyPage } from './app.po';

describe('codependency App', () => {
  let page: CodependencyPage;

  beforeEach(() => {
    page = new CodependencyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
