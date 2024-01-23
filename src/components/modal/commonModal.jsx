import React from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        overflow: "scroll"
    };
}
const CommonModal = ({ isOpen, children, isClose }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '8px',
        // overflowY: "scroll",
        
        p: 4,
    };

    const close_mod={
        position: 'absolute',
        top: '10px',
        right: '10px',
    };
    return (
        <>
            <Modal
                open={isOpen}
                onClose={isClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                    <IconButton aria-label="delete" onClick={isClose} className="close_modal" sx={close_mod}>
                        <CloseIcon />
                    </IconButton>
                </Box>

            </Modal>
        </>
    )
}

export default CommonModal;