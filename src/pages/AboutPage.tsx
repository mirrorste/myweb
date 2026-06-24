import { motion } from "framer-motion";
import {
  User,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Briefcase,
  Code2,
  MapPin,
  Coffee,
} from "lucide-react";
import { profile } from "@/data/profile";

const skillCategories = ["网络通信", "系统编程", "前端", "后端", "DevOps"];

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="container max-w-4xl">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-gh-green via-gh-blue to-gh-purple rounded-full blur-xl opacity-30 animate-pulse-slow" />
            <img
              src={profile.avatar}
              alt={profile.name}
              className="relative w-32 h-32 rounded-full bg-gh-bg-secondary border-4 border-gh-border"
            />
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-gh-green rounded-full border-4 border-gh-bg" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gh-text mb-3 font-mono">
            {profile.name}
          </h1>
          <p className="text-xl text-gh-green mb-6">{profile.title}</p>
          <p className="text-lg text-gh-text-muted max-w-2xl mx-auto leading-relaxed mb-8">
            {profile.bio}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${profile.social.email}`}
              className="gh-btn-primary"
            >
              <Mail className="w-4 h-4" />
              联系我
            </a>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="gh-btn"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="section-title">
            <span className="text-gh-text">技能栈</span>
            <Code2 className="w-6 h-6 text-gh-blue" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, catIndex) => {
              const categorySkills = profile.skills.filter(
                (s) => s.category === category
              );
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                  className="gh-card p-6"
                >
                  <h3 className="text-lg font-semibold text-gh-text mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gh-green" />
                    {category}
                  </h3>
                  <div className="space-y-4">
                    {categorySkills.map((skill, skillIndex) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-sm text-gh-text font-medium">
                            {skill.name}
                          </span>
                          <span className="text-sm text-gh-text-muted">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-gh-bg-tertiary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: catIndex * 0.1 + skillIndex * 0.1,
                              ease: "easeOut",
                            }}
                            className="h-full bg-gradient-to-r from-gh-green to-gh-blue rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="section-title">
            <span className="text-gh-text">工作经历</span>
            <Briefcase className="w-6 h-6 text-gh-purple" />
          </h2>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gh-border" />

            {profile.experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative mb-12 ${
                  index % 2 === 0 ? "md:pr-12 md:mr-auto md:ml-0 md:w-1/2" : "md:pl-12 md:ml-auto md:mr-0 md:w-1/2"
                }`}
              >
                <div
                  className={`absolute top-6 w-4 h-4 rounded-full bg-gh-bg border-4 border-gh-green ${
                    index % 2 === 0
                      ? "left-2 md:left-auto md:right-0 md:translate-x-1/2"
                      : "left-2 md:left-0 md:-translate-x-1/2"
                  }`}
                />

                <div className="gh-card p-6 ml-12 md:ml-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs bg-gh-green/10 text-gh-green border border-gh-green/30">
                      {exp.period}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gh-text mb-1 font-mono">
                    {exp.position}
                  </h3>
                  <p className="text-gh-blue mb-3">{exp.company}</p>
                  <p className="text-gh-text-muted text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="text-gh-text">联系方式</span>
            <Mail className="w-6 h-6 text-gh-orange" />
          </h2>

          <div className="gh-card p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a
                href={`mailto:${profile.social.email}`}
                className="flex flex-col items-center p-6 rounded-lg bg-gh-bg-tertiary hover:bg-gh-green/10 border border-transparent hover:border-gh-green/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-gh-green/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-gh-green" />
                </div>
                <span className="font-medium text-gh-text mb-1">邮箱</span>
                <span className="text-sm text-gh-text-muted truncate w-full text-center">
                  {profile.social.email}
                </span>
              </a>

              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 rounded-lg bg-gh-bg-tertiary hover:bg-gh-blue/10 border border-transparent hover:border-gh-blue/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-gh-blue/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Github className="w-6 h-6 text-gh-blue" />
                </div>
                <span className="font-medium text-gh-text mb-1">GitHub</span>
                <span className="text-sm text-gh-text-muted">
                  @{profile.name}
                </span>
              </a>

              <a
                href={profile.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 rounded-lg bg-gh-bg-tertiary hover:bg-gh-purple/10 border border-transparent hover:border-gh-purple/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-gh-purple/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Twitter className="w-6 h-6 text-gh-purple" />
                </div>
                <span className="font-medium text-gh-text mb-1">Twitter</span>
                <span className="text-sm text-gh-text-muted">
                  @{profile.name}
                </span>
              </a>

              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 rounded-lg bg-gh-bg-tertiary hover:bg-gh-blue/10 border border-transparent hover:border-gh-blue/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-gh-blue/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Linkedin className="w-6 h-6 text-gh-blue" />
                </div>
                <span className="font-medium text-gh-text mb-1">LinkedIn</span>
                <span className="text-sm text-gh-text-muted">
                  {profile.name}
                </span>
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-gh-border text-center">
              <p className="text-gh-text-muted flex items-center justify-center gap-2">
                <Coffee className="w-5 h-5 text-gh-orange" />
                期待与你交流，一起成长！
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
