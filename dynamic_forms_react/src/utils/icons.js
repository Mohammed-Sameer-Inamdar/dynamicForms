export const EditIcon = ({ width, height, tintColor }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width || "48px"} height={height || "48px"}
        fill={tintColor || "#ccc"}>
        <path d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z" />
    </svg>
)

export const DeleteIcon = ({ width, height, tintColor }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width || "48px"} height={height || "48px"}
        fill={tintColor || "#ccc"}>
        <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z" />
    </svg>
)

export const SaveIcon = ({ width, height, tintColor }) => (
    <svg width={width || "800px"} height={height || "800px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6C4 4.89543 4.89543 4 6 4H12H14.1716C14.702 4 15.2107 4.21071 15.5858 4.58579L19.4142 8.41421C19.7893 8.78929 20 9.29799 20 9.82843V12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" stroke={tintColor || "#000000"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M8 4H13V7C13 7.55228 12.5523 8 12 8H9C8.44772 8 8 7.55228 8 7V4Z" stroke={tintColor || "#000000"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M7 15C7 13.8954 7.89543 13 9 13H15C16.1046 13 17 13.8954 17 15V20H7V15Z" stroke={tintColor || "#000000"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)

export const CheckMarkIcon = ({ width, height, tintColor }) => (
    <svg width={width || "800px"} height={height || "800px"} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" >
        <path fill={tintColor || "#31373D"} d="M34.459 1.375a2.999 2.999 0 0 0-4.149.884L13.5 28.17l-8.198-7.58a2.999 2.999 0 1 0-4.073 4.405l10.764 9.952s.309.266.452.359a2.999 2.999 0 0 0 4.15-.884L35.343 5.524a2.999 2.999 0 0 0-.884-4.149z">
        </path>
    </svg>
)

export const DragIcon = ({ width, height, tintColor }) => (
    <svg fill={tintColor || "#000000"} version="1.1" xmlns="http://www.w3.org/2000/svg"
        width={width || "800px"} height={height || "800px"} viewBox="0 0 32 32">

        <rect x="10" y="6" width="4" height="4" />
        <rect x="18" y="6" width="4" height="4" />
        <rect x="10" y="14" width="4" height="4" />
        <rect x="18" y="14" width="4" height="4" />
        <rect x="10" y="22" width="4" height="4" />
        <rect x="18" y="22" width="4" height="4" />
        <rect id="_Transparent_Rectangle_" fill="none" width="32" height="32" />
    </svg>
)