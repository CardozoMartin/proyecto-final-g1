import React from 'react'

const Cliente = ({ menuItems, activeTab }) => {

    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow-sm border-0">
                    <div className="card-header bg-white">
                        <h5 className="card-title mb-0">
                            {menuItems.find(item => item.id === activeTab)?.label}
                        </h5>
                    </div>
                    <div className="card-body text-center py-5">
                        <span style={{ fontSize: '4rem' }}>
                            {menuItems.find(item => item.id === activeTab)?.icon}
                        </span>
                        <h4 className="mt-3">
                            Sección des {menuItems.find(item => item.id === activeTab)?.label}
                        </h4>
                        <p className="text-muted">
                            Esta sección está en desarrollo. Aquí irá el contenido de {menuItems.find(item => item.id === activeTab)?.label}.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cliente