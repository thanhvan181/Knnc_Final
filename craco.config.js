const CracoAntDesignPlugin = require('craco-antd');


module.exports = {
    eslint: {
        enable: false,
    },
    plugins: [

        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeTheme: {
                    '@primary-color': '#91d5ff',
                    '@error-color': '#B00020',
                    '@border-radius-base': '5px',
                    '@table-border-radius-base': '10px',
                    '@font-size-base': '14px',
                    '@text-color': 'rgba(0, 0, 0, 0.6)',
                    '@table-header-sort-bg': '#fafafa',
                    '@table-body-sort-bg': '#fff',
                    '@table-body-selected-sort-bg': '#fff',


                    // '@yellow':'#FDA700',
                    // '@red': '#EF4444',
                    // '@white':'#FFFFFF',
                    // '@blue-main':'#91d5ff',
                    // '@black-main-text':'#000000',
                    // '@blue-extra':'#A5F3FC',
                    // '@gray':'#71717A',
                    // '@border-radius-light':'5px',
                    // '@border-radius-medium':'10px',
                    // '@border-radius-strong':'20px'
                },
            },
        },
    ],
};