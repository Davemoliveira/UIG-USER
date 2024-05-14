// ** React Imports
import { forwardRef, Fragment } from "react"

// ** MUI Imports
import { useTheme } from "@emotion/react"

import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import { Box } from "@mui/system"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const CommonModal = ({
  handleClose,
  open,
  title,
  content,
  size,
  tabs,
  isCloseButtonHide = false,
  stopCloseOnOutSideClick = false,
  customClass = ""
}) => {
  const theme = useTheme()

  return (
    <Fragment>
      <Dialog
        open={open}
        keepMounted
        onClose={(_, reason) => {
          if (
            !(
              stopCloseOnOutSideClick &&
              (reason === "backdropClick" || reason === "escapeKeyDown")
            )
          ) {
            handleClose()
          }
        }}
        className={`${customClass && customClass !== "" ? customClass : ""}`}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth={size}
        fullWidth={size}
      >
        <Box
          position="relative"
          sx={{
            borderBottom: "1px solid #EBEBEB"
          }}
        >
          <DialogTitle
            id="alert-dialog-slide-title"
            sx={{
              textAlign: "center",
              padding: "16px 24px",
              fontSize: "18px",
              fontWeight: "600",
              lineHeight: "24px",
              color: "#fff"
            }}
          >
            {title}
          </DialogTitle>
          {isCloseButtonHide ? (
            <></>
          ) : (
            <Box
              sx={{
                cursor: "pointer",
                position: "absolute",
                top: "20px",
                right: "16px",
                "& svg": {
                  transition: "0.2s ease-in-out",
                  cursor: "pointer"
                },
                "&:hover": {
                  "& svg": {
                    transform: "rotate(180deg)"
                  }
                }
              }}
              onClick={handleClose}
            >
              close
            </Box>
          )}
        </Box>
        <DialogContent
          sx={{
            padding: tabs ? "0 !important" : "16px  !important",
            scrollBehavior: "smooth"
          }}
          className="common-scroll"
        >
          {content}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default CommonModal
