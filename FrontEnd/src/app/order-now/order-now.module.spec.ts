import { OrderNowModule } from './order-now.module';

describe('OrederNowModule', () => {
  let orderNowModule: OrderNowModule;

  beforeEach(() => {
    orderNowModule = new OrderNowModule();
  });

  it('should create an instance', () => {
    expect(orderNowModule).toBeTruthy();
  });
});
