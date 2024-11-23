function NotSupported({inline}: {
    inline?: boolean
}) {
    if (inline) {
        return (
            <span className="text-red-600">Not Supported Span.</span>
        )
    }

    return (
        <div className="text-red-600">Not Supported Block.</div>
    )
}

export default NotSupported
