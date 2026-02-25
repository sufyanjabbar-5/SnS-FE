import React from "react";
import {
  FolderPlusIcon,
  MessageSquarePlusIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";

interface ChatSession {
  id: number;
  externalSessionId: string;
  title: string;
  mode: string;
  createdAt: string;
  updatedAt: string;
}

interface SidebarSectionProps {
  sessions: ChatSession[];
  activeSessionId: number | null;
  onSelectSession: (sessionId: number) => void;
  onNewChat: () => void;
  onDeleteSession: (sessionId: number) => void;
  isLoading: boolean;
}

export const SidebarSection = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  isLoading,
}: SidebarSectionProps): React.JSX.Element => {
  // Get user info from localStorage
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const userName = user ? `${user.firstName} ${user.lastName}` : "User";
  const userInitial = user?.firstName?.[0] || "U";

  return (
    <aside className="flex flex-col w-full max-w-[260px] bg-[#181818] border-r border-[#ffffff0d] h-screen">
      <header className="flex h-[52px] items-center justify-between px-2 bg-[#181818]">
        <img
          className="!h-8"
          alt="SnSCCS"
          src="/logo.png"
        />
        <Button variant="ghost" size="icon" className="h-auto p-0">
          <img
            alt="Menu"
            src="https://c.animaapp.com/mjxh4buzH06Hhf/img/container-2.svg"
          />
        </Button>
      </header>

      <nav className="flex flex-col px-1.5 pt-2 pb-0 bg-[#181818]">
        <Button
          variant="ghost"
          className="h-auto justify-start gap-1.5 px-2.5 py-2 rounded-[10px] text-white hover:bg-white/10"
          onClick={onNewChat}
        >
          <MessageSquarePlusIcon className="w-5 h-5" />
          <span className="font-segoe font-normal text-sm">New chat</span>
        </Button>

        <Button
          variant="ghost"
          className="h-auto justify-start gap-1.5 px-2.5 py-2 rounded-[10px] text-white hover:bg-white/10"
        >
          <SearchIcon className="w-5 h-5" />
          <span className="font-segoe font-normal text-sm">Search chats</span>
        </Button>
      </nav>

      <div className="h-1.5 bg-[#181818]" />

      <ScrollArea className="flex-1 bg-[#181818] [&>div>div[style]]:!block">
        <div className="flex flex-col pb-5">
          <section className="flex flex-col">
            <div className="flex px-4 py-1.5">
              <h2 className="font-segoe font-normal text-gray-300 text-sm">
                Projects
              </h2>
            </div>

            <Button
              variant="ghost"
              className="h-auto mx-[13.6px] justify-start gap-1.5 px-2.5 py-2 rounded-[10px] text-white hover:bg-white/10"
            >
              <FolderPlusIcon className="w-5 h-5" />
              <span className="font-segoe font-normal text-sm">
                New project
              </span>
            </Button>
          </section>

          <section className="flex flex-col pt-0 pb-5 px-0 mt-5">
            <div className="flex px-4 py-1.5">
              <h2 className="font-segoe font-normal text-gray-300 text-sm">
                Your chats
              </h2>
            </div>

            {isLoading && sessions.length === 0 ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            ) : sessions.length === 0 ? (
              <div className="px-4 py-2 text-gray-400 text-sm">
                No chats yet. Start a new chat!
              </div>
            ) : (
              <div className="flex flex-col">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`group flex items-center mx-[13.6px] rounded-[10px] hover:bg-white/10 ${
                      activeSessionId === session.id ? "bg-white/10" : ""
                    }`}
                  >
                    <Button
                      variant="ghost"
                      className="h-auto flex-1 justify-start px-2.5 py-1.5 text-white hover:bg-transparent"
                      onClick={() => onSelectSession(session.id)}
                    >
                      <span className="font-segoe font-normal text-sm text-left flex-1 truncate">
                        {session.title || "New chat"}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 hover:bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSession(session.id);
                      }}
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Separator className="mt-2 bg-[#ffffff0d]" />
          </section>
        </div>
      </ScrollArea>

      <footer className="flex flex-col p-1.5 bg-[#181818]">
        <div className="flex min-h-10 items-end justify-between pl-2 pr-0 pt-0 pb-1.5 rounded-[10px]">
          <div className="inline-flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://c.animaapp.com/mjxh4buzH06Hhf/img/profile-image.png" />
              <AvatarFallback className="bg-[#9a9b9a4c]">
                {userInitial}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="font-segoe font-normal text-white text-sm truncate max-w-[120px]">
                {userName}
              </span>
              <span className="font-segoe font-normal text-white text-xs">
                Free
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="h-auto px-[9.8px] py-[5px] bg-[#212121] border-[#ffffff26] text-white text-xs rounded-full hover:bg-[#2a2a2a]"
            >
              Upgrade
            </Button>
          </div>
        </div>
      </footer>
    </aside>
  );
};
