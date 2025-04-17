import * as z from 'zod'
export const registerSchema = z
	.object({
		email: z
			.string()
			.email('Пожалуйста, введите корректный адрес электронной почты.'),
		password: z.string().min(8, 'Пароль должен быть как минимум 8 символов. '),
		passwordRepeat: z
			.string()
			.min(8, 'Пароль должен быть как минимум 8 символов. '),
		name: z
			.string()
			.min(
				3,
				'Имя должно быть как минимум 3 символа и может содержать только буквы.'
			),
	})
	.refine(data => data.password === data.passwordRepeat, {
		message: 'Введенные пароли не совпадают. ',
		path: ['passwordRepeat'],
	})

export type RegisterSchema = z.output<typeof registerSchema>
