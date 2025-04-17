import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
	const firebaseConfig = {
		apiKey: 'AIzaSyBmw49ufke68zaFSI1Jh76JBDMkYupJtaQ',
		authDomain: 'morris-habit.firebaseapp.com',
		projectId: 'morris-habit',
		storageBucket: 'morris-habit.firebasestorage.app',
		messagingSenderId: '479318242910',
		appId: '1:479318242910:web:2bceefab062647d8a9a6cf',
		measurementId: 'G-ZD46QWTMVE',
	}

	const app = initializeApp(firebaseConfig)

	const analytics = getAnalytics(app)
	const db = getFirestore(app)

	return {
		provide: {
			analytics,
			db,
			firebaseApp: app,
		},
	}
})
