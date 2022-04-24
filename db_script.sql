--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-04-24 16:06:17

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 66508)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3338 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 66577)
-- Name: educational_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.educational_details (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    studentid uuid NOT NULL,
    institute_name character varying(64),
    qualification_category character varying(64),
    year_of_passing character varying(64),
    createdat character varying(64) NOT NULL,
    updatedat character varying(64)
);


ALTER TABLE public.educational_details OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 66569)
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(64) NOT NULL,
    rollno integer NOT NULL,
    createdat character varying(64) NOT NULL,
    updatedat character varying(64)
);


ALTER TABLE public.students OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 66544)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4(),
    username character varying(64),
    password character varying(124),
    createdat character varying(64) NOT NULL,
    updatedat character varying(64)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3192 (class 2606 OID 66582)
-- Name: educational_details educational_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.educational_details
    ADD CONSTRAINT educational_details_pkey PRIMARY KEY (id);


--
-- TOC entry 3188 (class 2606 OID 66574)
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- TOC entry 3190 (class 2606 OID 66576)
-- Name: students students_rollno_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_rollno_key UNIQUE (rollno);


--
-- TOC entry 3186 (class 2606 OID 66549)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3193 (class 2606 OID 66583)
-- Name: educational_details educational_details_studentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.educational_details
    ADD CONSTRAINT educational_details_studentid_fkey FOREIGN KEY (studentid) REFERENCES public.students(id);


-- Completed on 2022-04-24 16:06:17

--
-- PostgreSQL database dump complete
--

