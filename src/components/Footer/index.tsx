import Logo from "@assets/imgs/logo.png";

function Footer() {
    return (
        <div className="mt-8 border-t-[4px] border-solid border-[var(--gray)]">
            <div className="grid desktop:grid-cols-12">
                <div className="desktop:col-span-3">
                    <div>
                        <img
                            className="w-56"
                            src={Logo}
                            alt="Logo"
                        />

                        <div>© 2024 Story For All. All rights reserved</div>
                    </div>

                    <ul>
                        <li>
                            <i className="fa-brands fa-square-facebook"></i>
                        </li>

                        <li>
                            <i className="fa-brands fa-youtube"></i>
                        </li>

                        <li>
                            <i className="fa-brands fa-telegram"></i>
                        </li>

                        <li>
                            <i className="fa-brands fa-instagram"></i>
                        </li>
                    </ul>

                    <div>
                        <a 
                            href="//www.dmca.com/Protection/Status.aspx?ID=6b5e2b32-744e-478c-8e5a-44cfa49f85dd" 
                            title="DMCA.com Protection Status" 
                            className="dmca-badge"
                        > 
                            <img 
                                src="https://images.dmca.com/Badges/DMCA_logo-bw140w.png?ID=6b5e2b32-744e-478c-8e5a-44cfa49f85dd" 
                                alt="DMCA.com Protection Status" 
                            />
                        </a>  
                        <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"></script>
                    </div>
                </div>

                <div>

                </div>

                <div>

                </div>
            </div>
        </div>
    );
}

export default Footer;