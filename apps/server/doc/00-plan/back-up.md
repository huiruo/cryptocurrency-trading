

```javaScript
  async closeSpotStrategy2(spotOrders: SpotOrder[]): Promise<Result> {
    const ordersLength = spotOrders.length;
    const ordersGreaterThan2 = spotOrders.length >= 2;
    const lastOrder = get(spotOrders, `[${ordersLength - 1}]`, {});
    const firstOrder = get(spotOrders, '[0]', {});
    const { orderId, userId } = firstOrder;
    let qty = '';
    let quoteQty = '';
    let entryPrice = '';
    let sellingPrice = '';
    let sellingQty = '';
    let sellingQuoteQty = '';
    let sellingTime = 0;

    const strategyOrderId = await this.findStrategyOrderIdUtil(orderId);
    if (isEmpty(strategyOrderId)) {
      const strategyId = nanoid();
      console.log('== not exist strategy,create closeSpotStrategy ...');
      if (ordersGreaterThan2) {
        console.log('=== Increase or decrease coin position ===');
      } else {
        console.log('=== Buy and sell only once ===');

        qty = firstOrder.qty;
        quoteQty = firstOrder.quoteQty;
        entryPrice = firstOrder.price;
        sellingPrice = lastOrder.price;
        sellingQty = lastOrder.qty;
        sellingQuoteQty = lastOrder.quoteQty;
      }

      const createOrdersStrategy = {
        symbol: firstOrder.symbol,
        userId,
        qty,
        quoteQty,
        entryPrice,
        sellingPrice,
        sellingQty,
        sellingQuoteQty,
        time: firstOrder.time,
        sellingTime: lastOrder.time,
        strategyId,
      };

      await this.createOrdersStrategyUtil('create', createOrdersStrategy);

      // create StrategyOrderId by fist order
      this.createStrategyOrderIdUtil({ userId, strategyId, orderId });
      // UpdateSpotOrders start
      const running = 1;
      spotOrders.forEach(async (item) => {
        const { id } = item;
        this.updateOrderStatus('spot', id, strategyId, running);
      });
      // UpdateSpotOrders end
    } else {
      console.log('== exist strategyOrderId,update strategy ... ==');
      const strategyId = get(strategyOrderId, '[0].strategyId', '');
      if (ordersGreaterThan2) {
        console.log('=== Increase or decrease coin position ===');
      } else {
        console.log('=== Buy and sell only once ===');
        qty = firstOrder.qty;
        quoteQty = firstOrder.quoteQty;
        entryPrice = firstOrder.price;
        sellingPrice = lastOrder.price;
        sellingQty = lastOrder.qty;
        sellingQuoteQty = lastOrder.quoteQty;
        sellingTime = lastOrder.time;
      }

      const createOrdersStrategy = {
        symbol: firstOrder.symbol,
        userId,
        qty: firstOrder.qty,
        quoteQty: firstOrder.quoteQty,
        entryPrice: firstOrder.price,
        sellingPrice: lastOrder.price,
        sellingQty: lastOrder.qty,
        sellingQuoteQty: lastOrder.quoteQty,
        sellingTime: lastOrder.time,
        strategyId,
        time: 0,
      };

      await this.createOrdersStrategyUtil('update', createOrdersStrategy);
      // UpdateSpotOrders start
      const running = 1;
      spotOrders.forEach(async (item) => {
        const { id } = item;
        this.updateOrderStatus('spot', id, strategyId, running);
      });
      // UpdateSpotOrders end
    }

    return { code: 200, message: 'ok', data: null };
  }



  private async createOrdersStrategyUtil(
    type: string,
    createOrdersStrategy: CreateOrdersStrategy,
  ) {
    const {
      userId,
      qty,
      quoteQty,
      entryPrice,
      sellingPrice,
      sellingQty,
      sellingQuoteQty,
      symbol,
      time,
      sellingTime,
      strategyId,
    } = createOrdersStrategy;

    if (type === 'create') {
      const { profit, profitRate } = this.calculateStrategyProfit(
        sellingPrice,
        entryPrice,
        qty,
        quoteQty,
      );

      const strategiesOrder = {
        userId,
        strategyId,
        price: '',
        qty: qty,
        quoteQty: quoteQty,
        sellingQty,
        sellingQuoteQty,
        profit: 0,
        profitRate: '',
        realizedProfit: profit,
        realizedProfitRate: profitRate,
        entryPrice: entryPrice,
        sellingPrice: sellingPrice,
        is_running: false,
        symbol,
        time,
        sellingTime,
      };

      await this.createStrategyOrderUtil(strategiesOrder);
    } else if (type === 'update') {
      const { profit, profitRate } = this.calculateStrategyProfit(
        sellingPrice,
        entryPrice,
        qty,
        quoteQty,
      );

      const sql = `update strategies_order set sellingPrice="${sellingPrice}",sellingQty="${sellingQty}",sellingQuoteQty="${sellingQuoteQty}",realizedProfitRate = "${profitRate}",realizedProfit = "${profit}",sellingTime="${sellingTime}",is_running = 0  WHERE strategyId = "${strategyId}"`;
      const result = await this.strategiesOrderRepo.query(sql);
    }
  }
```