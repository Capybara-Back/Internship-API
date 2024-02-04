INSERT INTO public."user"(
	id, "firstName", "lastName", email, password, role)
	VALUES ('a63228aa-cc48-4627-bfc8-7a17066e13d9', 'Ethan', 'Anderson', 'ethan.anderson@gmail.com.invalid', '$2y$10$LVElPi.74vWdYrkcT6V1fOEs32M7E4uKfj/1aVzP.s/yMEWLpDowi', 'user'),
	('6703ded6-519d-4cb8-b98b-9a3a109263d5', 'Emma', 'Martinez', 'emma.martinez@gmail.com.invalid', '$2y$10$LVElPi.74vWdYrkcT6V1fOEs32M7E4uKfj/1aVzP.s/yMEWLpDowi', 'user');
INSERT INTO public.student(
	id, "userId")
	VALUES ('2a63ed36-1450-4ce9-bafc-1a261048e3f2', '6703ded6-519d-4cb8-b98b-9a3a109263d5');
INSERT INTO public.company(
	name, address, city, "zipCode")
	VALUES ('Dassault Systèmes', '12 rue de la liberté', 'Vélizy-Villacoublay', '78560');
INSERT INTO public.company_tutor(
	id, email, "userId", "companyName", "firstName", "lastName", "phoneNumber")
	VALUES ('42ab37be-af42-44da-9dd6-1c09aa6c473a', 'john.johonson@gmail.com.invalid', null, 'Dassault Systèmes', 'John', 'Johonson', '0123456789');
INSERT INTO public.academic_tutor(
	id, "schoolEmail", "userId", "email", "firstName", "lastName", "phoneNumber")
	VALUES ('8ecc03fe-0200-4a36-9b29-981a5c69f64d', 'jean-jacques.augustin@efrei.net', null, 'jean-jacques.augustin@email.com', 'Jacques', 'Augustin', '0111111111');