import { Github, Twitter, Mail, Linkedin, Heart } from "lucide-react";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-gh-border mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
          <h3 className="font-mono font-bold text-lg mb-4 text-gh-text">
            {"<DevBlog/>"}
          </h3>
          <p className="text-gh-text-muted text-sm leading-relaxed">
            分享技术心得，记录成长之路。
            <br />
            代码改变世界，热爱永不止步。
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-gh-text">快速链接</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/"
                className="text-gh-text-muted hover:text-gh-green transition-colors"
              >
                首页
              </a>
            </li>
            <li>
              <a
                href="/archive"
                className="text-gh-text-muted hover:text-gh-green transition-colors"
              >
                归档
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-gh-text-muted hover:text-gh-green transition-colors"
              >
                关于
              </a>
            </li>
          </ul>
          </div>

          <div>
          <h4 className="font-semibold mb-4 text-gh-text">联系方式</h4>
          <div className="flex gap-4">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md bg-gh-bg-tertiary text-gh-text-muted hover:text-gh-green hover:bg-gh-green/10 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profile.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md bg-gh-bg-tertiary text-gh-text-muted hover:text-gh-blue hover:bg-gh-blue/10 transition-all"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profile.social.email}`}
              className="p-2 rounded-md bg-gh-bg-tertiary text-gh-text-muted hover:text-gh-purple hover:bg-gh-purple/10 transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md bg-gh-bg-tertiary text-gh-text-muted hover:text-gh-blue hover:bg-gh-blue/10 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
        </div>

        <div className="border-t border-gh-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gh-text-muted">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="text-sm text-gh-text-muted flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-gh-red" /> and lots of ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
