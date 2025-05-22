import {  type about_me as PrismaAboutMeType } from "@prisma/client";
import { type courses as PrismaCourseType } from "@prisma/client";
import { type projects as PrismaProjectType } from "@prisma/client";
import { type skills as PrismaSkillType } from "@prisma/client";
import { type users as PrismaUserType } from "@prisma/client";

export type AboutTextType = PrismaAboutMeType;

export type Course = PrismaCourseType;

export type Project = PrismaProjectType;

export type Skill = PrismaSkillType;

export type User = PrismaUserType;