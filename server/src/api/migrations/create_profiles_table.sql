-- Table: public.profiles

-- DROP TABLE IF EXISTS public.profiles;

CREATE TABLE IF NOT EXISTS public.profiles
(
    profile_id integer NOT NULL DEFAULT nextval('profiles_profile_id_seq'::regclass),
    user_id integer,
    avatar_url text COLLATE pg_catalog."default",
    first_name character varying(100) COLLATE pg_catalog."default",
    last_name character varying(100) COLLATE pg_catalog."default",
    about text COLLATE pg_catalog."default",
    age integer,
    country character varying(100) COLLATE pg_catalog."default",
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT profiles_pkey PRIMARY KEY (profile_id),
    CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT profiles_age_check CHECK (age >= 0)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.profiles
    OWNER to postgres;