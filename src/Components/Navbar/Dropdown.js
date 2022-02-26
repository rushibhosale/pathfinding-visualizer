

export function Dropdown({ data }) {
    return (
        <ul className={data.toggleDropdown ? `dropdown-content show ` : `dropdown-content`}>
            {
                data.list.map((item, index) => {
                    return <li key={index} className={data.toggleDropdown ? data.extacssClass : ''}>
                        <a href="javascript:void(0);" onClick={e => data.handler(e, item.title)}>{item.title}</a></li>;
                })
            }
        </ul>
    );
}