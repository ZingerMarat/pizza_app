import { Button, Dialog } from "@/shared/components/ui";
import { DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { signIn } from "next-auth/react";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        <VisuallyHidden>
          <DialogTitle></DialogTitle>
        </VisuallyHidden>
        Form
        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              signIn("github", { callbackUrl: "/", redirect: true });
            }}
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img className="w-6 h-6" src="https://github.githubassets.com/favicons/favicon.svg" />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              signIn("google", { callbackUrl: "/", redirect: true });
            }}
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img className="w-6 h-6" src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" />
            GitHub
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
