CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TYPE IF EXISTS internship_status_enum;
CREATE TYPE internship_status_enum AS ENUM ('pending', 'accepted', 'rejected');
DROP type IF EXISTS user_role_enum;
CREATE TYPE user_role_enum AS ENUM ('user', 'admin');

CREATE TABLE IF NOT EXISTS public.academic_tutor
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    "firstName" character varying COLLATE pg_catalog."default" NOT NULL,
    "lastName" character varying COLLATE pg_catalog."default" NOT NULL,
    "phoneNumber" character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    "schoolEmail" character varying COLLATE pg_catalog."default" NOT NULL,
    "userId" uuid,
    CONSTRAINT "PK_c193e92081285bf342deeb85696" PRIMARY KEY (id),
    CONSTRAINT "REL_563b4bee79a9674457159c6c11" UNIQUE ("userId")
);

CREATE TABLE IF NOT EXISTS public.company
(
    name character varying COLLATE pg_catalog."default" NOT NULL,
    address character varying COLLATE pg_catalog."default" NOT NULL,
    city character varying COLLATE pg_catalog."default" NOT NULL,
    "zipCode" character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_a76c5cd486f7779bd9c319afd27" PRIMARY KEY (name)
);

CREATE TABLE IF NOT EXISTS public.company_tutor
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    email character varying COLLATE pg_catalog."default" NOT NULL,
    "firstName" character varying COLLATE pg_catalog."default" NOT NULL,
    "lastName" character varying COLLATE pg_catalog."default" NOT NULL,
    "phoneNumber" character varying COLLATE pg_catalog."default" NOT NULL,
    "userId" uuid,
    "companyName" character varying COLLATE pg_catalog."default",
    CONSTRAINT "PK_65a35825e7d5aff43c966c11f9f" PRIMARY KEY (id),
    CONSTRAINT "REL_ed67a6e3a5e59d305894229095" UNIQUE ("userId")
);

CREATE TABLE IF NOT EXISTS public.document
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    "levelOfConfidentiality" integer NOT NULL,
    "internshipId" uuid,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    path character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.internship
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    title character varying COLLATE pg_catalog."default" NOT NULL,
    "missionDescription" character varying COLLATE pg_catalog."default" NOT NULL,
    "startDate" date NOT NULL,
    "endDate" date NOT NULL,
    status internship_status_enum DEFAULT 'pending'::internship_status_enum,
    salary numeric NOT NULL,
    "studentId" uuid,
    "academicTutorId" uuid,
    "companyTutorId" uuid,
    "companyName" character varying COLLATE pg_catalog."default",
    CONSTRAINT "PK_dd14a64bcc5e8b5843a2764915a" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.student
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    "userId" uuid,
    CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY (id),
    CONSTRAINT "REL_b35463776b4a11a3df3c30d920" UNIQUE ("userId")
);

CREATE TABLE IF NOT EXISTS public."user"
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    "firstName" character varying(30) COLLATE pg_catalog."default" NOT NULL,
    "lastName" character varying(30) COLLATE pg_catalog."default" NOT NULL,
    email character varying(60) COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    role user_role_enum DEFAULT 'user'::user_role_enum,
    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id),
    CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email)
);

ALTER TABLE IF EXISTS public.academic_tutor
    ADD CONSTRAINT "FK_563b4bee79a9674457159c6c114" FOREIGN KEY ("userId")
    REFERENCES public."user" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS "REL_563b4bee79a9674457159c6c11"
    ON public.academic_tutor("userId");


ALTER TABLE IF EXISTS public.company_tutor
    ADD CONSTRAINT "FK_b77651b6aee53197340d373bf95" FOREIGN KEY ("companyName")
    REFERENCES public.company (name) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.company_tutor
    ADD CONSTRAINT "FK_ed67a6e3a5e59d305894229095f" FOREIGN KEY ("userId")
    REFERENCES public."user" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS "REL_ed67a6e3a5e59d305894229095"
    ON public.company_tutor("userId");


ALTER TABLE IF EXISTS public.document
    ADD CONSTRAINT "FK_8fc4895a9f45094aa8c91da3967" FOREIGN KEY ("internshipId")
    REFERENCES public.internship (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.internship
    ADD CONSTRAINT "FK_1109390650e1d3fb1ca2d067311" FOREIGN KEY ("studentId")
    REFERENCES public.student (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.internship
    ADD CONSTRAINT "FK_7eb1d1fc48f957686b9e42f8b65" FOREIGN KEY ("academicTutorId")
    REFERENCES public.academic_tutor (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.internship
    ADD CONSTRAINT "FK_c5cd3c95da6a86d90cb21f3df8e" FOREIGN KEY ("companyTutorId")
    REFERENCES public.company_tutor (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.internship
    ADD CONSTRAINT "FK_d960dd1e76fa1f06c9906bb8045" FOREIGN KEY ("companyName")
    REFERENCES public.company (name) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.student
    ADD CONSTRAINT "FK_b35463776b4a11a3df3c30d920a" FOREIGN KEY ("userId")
    REFERENCES public."user" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS "REL_b35463776b4a11a3df3c30d920"
    ON public.student("userId");

END;

INSERT INTO public."user"(
	id, "firstName", "lastName", email, password, role)
	VALUES ('a63228aa-cc48-4627-bfc8-7a17066e13d9', 'Ethan', 'Anderson', 'ethan.anderson@gmail.com.invalid', '$2y$10$LVElPi.74vWdYrkcT6V1fOEs32M7E4uKfj/1aVzP.s/yMEWLpDowi', 'user'),
	('6703ded6-519d-4cb8-b98b-9a3a109263d5', 'Emma', 'Martinez', 'emma.martinez@gmail.com.invalid', '$2y$10$LVElPi.74vWdYrkcT6V1fOEs32M7E4uKfj/1aVzP.s/yMEWLpDowi', 'user');
INSERT INTO public.student(
	id, "userId")
	VALUES ('2a63ed36-1450-4ce9-bafc-1a261048e3f2', '6703ded6-519d-4cb8-b98b-9a3a109263d5');