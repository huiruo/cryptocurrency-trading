import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import {
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
      req.session.loginStatus = 1
      const { avatar, email, username } = result.data
      req.session.payload = { avatar, email, username }
      await req.session.save()
      res.redirect(
        `${webRedirect}?from=${THIRD_PARTY_LOGIN_TAG}&codeToken=${result.data.token}`,
      )
    } else {
      req.session.loginStatus = 2
      await req.session.save()
      res.redirect(`${loginRedirect}?isLoginSuccessful=${2}`)
    }
  } catch (error: unknown) {
    req.session.loginStatus = 2
    await req.session.save()
    res.redirect(`${loginRedirect}?isLoginSuccessful=${2}`)
  }
}, sessionOptions)
