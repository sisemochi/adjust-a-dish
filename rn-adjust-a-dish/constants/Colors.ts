const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
    light: {
        text: '#000',
        background: '#fff',
        tint: tintColorLight,
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorLight,
    },
    dark: {
        text: '#fff',
        background: '#000',
        tint: tintColorDark,
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorDark,
    },
};

export const defaultLightTheme = {
    "colors": {
        "primary": "rgb(103, 80, 164)",
        "onPrimary": "rgb(255, 255, 255)",
        "primaryContainer": "rgb(233, 221, 255)",
        "onPrimaryContainer": "rgb(34, 0, 92)",
        "secondary": "rgb(98, 91, 112)",
        "onSecondary": "rgb(255, 255, 255)",
        "secondaryContainer": "rgb(232, 222, 248)",
        "onSecondaryContainer": "rgb(30, 25, 43)",
        "tertiary": "rgb(126, 82, 96)",
        "onTertiary": "rgb(255, 255, 255)",
        "tertiaryContainer": "rgb(255, 217, 227)",
        "onTertiaryContainer": "rgb(49, 16, 29)",
        "error": "rgb(186, 26, 26)",
        "onError": "rgb(255, 255, 255)",
        "errorContainer": "rgb(255, 218, 214)",
        "onErrorContainer": "rgb(65, 0, 2)",
        "background": "rgb(255, 251, 255)",
        "onBackground": "rgb(28, 27, 30)",
        "surface": "rgb(255, 251, 255)",
        "onSurface": "rgb(28, 27, 30)",
        "surfaceVariant": "rgb(231, 224, 235)",
        "onSurfaceVariant": "rgb(73, 69, 78)",
        "outline": "rgb(122, 117, 127)",
        "outlineVariant": "rgb(202, 196, 207)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(49, 48, 51)",
        "inverseOnSurface": "rgb(244, 239, 244)",
        "inversePrimary": "rgb(207, 188, 255)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(247, 242, 250)",
            "level2": "rgb(243, 237, 248)",
            "level3": "rgb(238, 232, 245)",
            "level4": "rgb(237, 231, 244)",
            "level5": "rgb(234, 227, 242)"
        },
        "surfaceDisabled": "rgba(28, 27, 30, 0.12)",
        "onSurfaceDisabled": "rgba(28, 27, 30, 0.38)",
        "backdrop": "rgba(50, 47, 56, 0.4)"
    }
}

export const defaultDarkTheme = {
    "colors": {
        "primary": "rgb(207, 188, 255)",
        "onPrimary": "rgb(56, 30, 114)",
        "primaryContainer": "rgb(79, 55, 138)",
        "onPrimaryContainer": "rgb(233, 221, 255)",
        "secondary": "rgb(204, 194, 219)",
        "onSecondary": "rgb(51, 45, 65)",
        "secondaryContainer": "rgb(74, 68, 88)",
        "onSecondaryContainer": "rgb(232, 222, 248)",
        "tertiary": "rgb(239, 184, 200)",
        "onTertiary": "rgb(74, 37, 50)",
        "tertiaryContainer": "rgb(99, 59, 72)",
        "onTertiaryContainer": "rgb(255, 217, 227)",
        "error": "rgb(255, 180, 171)",
        "onError": "rgb(105, 0, 5)",
        "errorContainer": "rgb(147, 0, 10)",
        "onErrorContainer": "rgb(255, 180, 171)",
        "background": "rgb(28, 27, 30)",
        "onBackground": "rgb(230, 225, 230)",
        "surface": "rgb(28, 27, 30)",
        "onSurface": "rgb(230, 225, 230)",
        "surfaceVariant": "rgb(73, 69, 78)",
        "onSurfaceVariant": "rgb(202, 196, 207)",
        "outline": "rgb(148, 143, 153)",
        "outlineVariant": "rgb(73, 69, 78)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(230, 225, 230)",
        "inverseOnSurface": "rgb(49, 48, 51)",
        "inversePrimary": "rgb(103, 80, 164)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(37, 35, 41)",
            "level2": "rgb(42, 40, 48)",
            "level3": "rgb(48, 45, 55)",
            "level4": "rgb(50, 46, 57)",
            "level5": "rgb(53, 50, 62)"
        },
        "surfaceDisabled": "rgba(230, 225, 230, 0.12)",
        "onSurfaceDisabled": "rgba(230, 225, 230, 0.38)",
        "backdrop": "rgba(50, 47, 56, 0.4)"
    }
}
