import React, { LegacyRef, ReactElement, useEffect, useRef } from "react";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Position } from "../common/types";

type ModalProps = {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  title: string | ReactElement;
  children: React.ReactElement;
  closeModal?: () => void;
  position?: Position | null;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  closeModal,
  position,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  function onMouseLeave() {
    console.log("mouse leave happened");
    if (closeModal) {
      closeModal();
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              afterEnter={() => {
                panelRef.current?.addEventListener("mouseleave", onMouseLeave);
              }}
              afterLeave={() => {
                panelRef.current?.removeEventListener(
                  "mouseleave",
                  onMouseLeave
                );
              }}
            >
              <Dialog.Panel
                ref={panelRef}
                style={
                  position
                    ? {
                        position: "fixed",
                        ...position,
                      }
                    : {}
                }
                className=" transform overflow-hidden rounded-2xl bg-dark text-left align-middle shadow-xl transition-all"
              >
                <div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    {title}
                  </Dialog.Title>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
