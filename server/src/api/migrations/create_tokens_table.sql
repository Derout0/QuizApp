-- Table: public.tokens

-- DROP TABLE IF EXISTS public.tokens;

CREATE TABLE IF NOT EXISTS public.tokens
(
    id integer NOT NULL DEFAULT nextval('tokens_id_seq'::regclass),
    user_id integer,
    refresh_token text COLLATE pg_catalog."default" NOT NULL,
    refresh_token_expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT tokens_pkey PRIMARY KEY (id),
    CONSTRAINT tokens_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tokens
    OWNER to postgres;