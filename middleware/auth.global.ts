import { getAuth } from 'firebase/auth'
import { AUTHORIZED_ROUTES, ROUTES, UNAUTHORIZED_ROUTES } from '~/config/routes'

export default defineNuxtRouteMiddleware(to => {
	const userId = getAuth().currentUser?.uid

	if (!userId && AUTHORIZED_ROUTES.includes(to.path)) {
		return navigateTo(ROUTES.AUTH.LOGIN, { replace: true })
	}
	if (userId && UNAUTHORIZED_ROUTES.includes(to.path)) {
		return navigateTo(ROUTES.INDEX, { replace: true })
	}
})
