import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
}

export const ToolCard = ({ title, description, icon: Icon, href, badge }: ToolCardProps) => {
  return (
    <Link 
      to={href} 
      className="group block tool-card transition-all duration-300 hover:border-primary/20"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 bg-gradient-primary rounded-lg p-3 group-hover:shadow-glow transition-all duration-300">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            {badge && (
              <span className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};