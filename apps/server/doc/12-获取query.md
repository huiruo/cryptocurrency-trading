
```js
// 方式1
async HandleGoogleAuthCode(@Req() req: any, @Res() res: any): Promise<any> {
    const { query } = req
    const code = query.code as string
    const state = query.state as string
}


// 方式2
async handlerGoogleAuth( @Query('code') code: string,
  @Query('state') state: string,
  @Req() req: Request,
  @Res() res: Response,
): Promise<void> {

}
```