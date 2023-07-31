import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import {
  FAIL,
  SUCCESS,
  THIRD_PARTY_LOGIN_TAG,
  loginRedirect,
  webRedirect,
} from '@common/constants'
import { handleGoogleAuthCodeApi } from '@services/next.api'

export default withIronSessionApiRoute(async (req, res) => {
  const { code } = req.query
  try {
    const result = await handleGoogleAuthCodeApi(code as string)
    if (result.statusCode === SUCCESS) {
      req.session.loginStatus = SUCCESS
      const { avatar, email, username, token } = result.data
      req.session.payload = { avatar, email, username }
      req.session.loginStatus = SUCCESS
      await req.session.save()
      res.redirect(
        `${webRedirect}?from=${THIRD_PARTY_LOGIN_TAG}&codeToken=${token}&isLogin=${SUCCESS}`,
      )
    } else {
      req.session.loginStatus = FAIL
      await req.session.save()
      res.redirect(`${loginRedirect}?isLogin=${FAIL}&msg=${result.message}`)
    }
  } catch (error: unknown) {
    req.session.loginStatus = FAIL
    await req.session.save()
    res.redirect(`${loginRedirect}?isLogin=${FAIL}&msg=${error}`)
  }
}, sessionOptions)
