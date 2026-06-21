import React, {
  forwardRef,
  ReactNode,
  useMemo,
} from "react";

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

import {
  Colors,
  Radius,
} from "../../theme";

interface AppBottomSheetProps {
  title?: string;

  children: ReactNode;

  snapPoints?: (string | number)[];
}

export const AppBottomSheet = forwardRef<
  BottomSheetModal,
  AppBottomSheetProps
>(
  (
    {
      children,
      snapPoints = ["50%", "80%"],
    },
    ref
  ) => {
    const points = useMemo(
      () => snapPoints,
      [snapPoints]
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={points}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: Colors.surface,
          borderTopLeftRadius: Radius.xl,
          borderTopRightRadius: Radius.xl,
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 16,
          }}
        >
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

AppBottomSheet.displayName =
  "AppBottomSheet";