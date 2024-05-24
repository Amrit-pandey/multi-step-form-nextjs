"use client";

import { useCallback } from "react";
import Button from "./Button";

interface CardProps {
  onSubmit: () => void;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  actionLabel?: string;
  secendoryAction?: () => void;
  secendoryActionLabel?: string;
}

const Card = ({
  onSubmit,
  body,
  footer,
  disabled,
  actionLabel,
  secendoryAction,
  secendoryActionLabel,
}: CardProps) => {
  const handleSubmit = useCallback(() => {
    if(disabled){
      return;
    }

    onSubmit()
  }, [disabled, onSubmit])

  const handleSecendoryAction = useCallback(() => {
    if(disabled || !secendoryAction) {
      return;
    }

    secendoryAction()
  }, [secendoryAction, disabled])


  return (
    <div className="flex items-center justify-center mx-auto overflow-x-hidden overflow-y-auto fiexd inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto border rounded-md  shadow-md mt-32">
        {/* BODY */}
        <div className="relative p-6 flex-auto">{body}</div>
        {/* FOOTER */}
        <div className="flex flex-col gap-2 p-6">
          <div className="flex flex-row items-center w-full gap-4">
            {secendoryAction && secendoryActionLabel && (
              <Button 
              outline
              disabled={disabled}
              label={secendoryActionLabel}
              onClick={handleSecendoryAction}
              />
            )}
            <Button 
            disabled={disabled}
            label={actionLabel}
            onClick={handleSubmit}
            />
          </div>
          {footer}
        </div>
      </div>
    </div>
  );
};

export default Card;
