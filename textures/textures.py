from PIL import Image
import numpy as np

from PIL import Image
import numpy as np
import matplotlib.colors as mcolors


class TextureGenerator:
    def __init__(self):
        pass

    @staticmethod
    def interpolate_color(color1, color2, factor):
        """
        Linearly interpolate between two RGB colors based on a factor (0.0 to 1.0).
        """
        return (
            int(color1[0] + (color2[0] - color1[0]) * factor),
            int(color1[1] + (color2[1] - color1[1]) * factor),
            int(color1[2] + (color2[2] - color1[2]) * factor),
        )

    @staticmethod
    def get_color_by_distance(distancia_au):
        """
        Get the color based on distance from the star using a color ramp.
        """
        colores_au = [
            (0.39, "#FFCC33"),  # Mercury (Yellow)
            (0.72, "#FF9966"),  # Venus (Orange)
            (1.00, "#3399FF"),  # Earth (Blue)
            (1.52, "#CC5533"),  # Mars (Red)
            (5.20, "#FFCC99"),  # Jupiter (Beige)
            (9.58, "#FFFF99"),  # Saturn (Pale Yellow)
            (19.2, "#66FFCC"),  # Uranus (Green-Blue)
            (30.0, "#3366FF")  # Neptune (Blue)
        ]

        # If the distance is less than Mercury or greater than Neptune, adjust to boundary colors
        if distancia_au <= 0.39:
            return mcolors.hex2color(colores_au[0][1])  # Mercury
        elif distancia_au >= 30.0:
            return mcolors.hex2color(colores_au[-1][1])  # Neptune

        # Interpolate between the colors based on distance
        for i in range(len(colores_au) - 1):
            au_start, color_start = colores_au[i]
            au_end, color_end = colores_au[i + 1]
            if au_start <= distancia_au <= au_end:
                # Linear interpolation between the two colors
                factor = (distancia_au - au_start) / (au_end - au_start)
                rgb_start = mcolors.hex2color(color_start)
                rgb_end = mcolors.hex2color(color_end)
                # Interpolate and return as RGB tuple
                return tuple(np.array(rgb_start) * (1 - factor) + np.array(rgb_end) * factor)

    @staticmethod
    def generate_noise_pattern(width, height, scale=10, contrast=50):
        """
        Generate a low-resolution noise pattern and scale it up.
        - scale: Controls the size of the noise pattern.
        - contrast: Controls the contrast of the noise pattern.
        """
        noise_width = (width // scale) + 1
        noise_height = (height // scale) + 1
        noise = np.random.randint(-contrast, contrast, (noise_height, noise_width))
        scaled_noise = np.kron(noise, np.ones((scale, scale)))
        return scaled_noise[:height, :width]

    @staticmethod
    def add_minecraft_style_water(img, water_level, water_color=(0, 105, 148), block_size=20):
        """
        Add Minecraft-style square water patches in a grid pattern.
        - img: The PIL image object to modify.
        - water_level: Controls the amount of water (1 = few water patches, 100 = many water patches).
        - water_color: The RGB color of water.
        - block_size: The size of each square block used to create water patches.
        """
        pixels = img.load()
        width, height = img.size

        # Determine number of rows and columns of water blocks based on the image size and block size
        num_rows = height // block_size
        num_cols = width // block_size

        # Probability of a block being part of water increases with water_level
        water_probability = water_level / 100

        # Generate water patches in a grid pattern
        for row in range(num_rows):
            for col in range(num_cols):
                # Randomly decide if this block should be a water patch based on water probability
                if np.random.rand() < water_probability:
                    # Draw a water block at this grid position
                    for dx in range(block_size):
                        for dy in range(block_size):
                            # Calculate the exact pixel position and set the water color
                            x = col * block_size + dx
                            y = row * block_size + dy
                            if x < width and y < height:
                                pixels[x, y] = water_color

        return img

    @staticmethod
    def generate_exoplanet_texture(width=1000, height=500, distance=1.0, water_level=50, noise_scale=20,
                                   noise_contrast=80, block_size=20):
        """
        Generate an exoplanet texture with a grid-based water pattern and noise.
        - width: The width of the image.
        - height: The height of the image.
        - distance: Distance from the star in astronomical units (AU) that affects the base color.
        - water_level: Controls the amount of water patches.
        - noise_scale: The scale of the noise pattern applied to the texture.
        - noise_contrast: The contrast of the noise pattern.
        - block_size: The size of each square block used for the water and clouds.
        """
        img = Image.new("RGB", (width, height))
        base_color = TextureGenerator.get_color_by_distance(distance)
        pixels = img.load()

        # Generate a noise pattern
        noise_pattern = TextureGenerator.generate_noise_pattern(width, height, scale=noise_scale,
                                                                contrast=noise_contrast)

        # Apply the noise pattern to the base color to create a texture
        for x in range(width):
            for y in range(height):
                noise_value = int(noise_pattern[y, x])
                r = min(255, max(0, int(base_color[0] * 255) + noise_value))
                g = min(255, max(0, int(base_color[1] * 255) + noise_value))
                b = min(255, max(0, int(base_color[2] * 255) + noise_value))
                pixels[x, y] = (r, g, b)

        # Add Minecraft-style water patches to the base image
        img = TextureGenerator.add_minecraft_style_water(img, water_level, block_size=block_size)
        return img

    @staticmethod
    def generate_water_mask(image, water_color=(0, 105, 148)):
        """
        Generate a mask image where water is white (255, 255, 255) and everything else is black (0, 0, 0).
        - image: The PIL image object to read from.
        - water_color: The RGB color of water used in the original image.
        """
        width, height = image.size

        # Create a new blank image for the mask
        mask = Image.new("RGB", (width, height), (0, 0, 0))
        mask_pixels = mask.load()
        image_pixels = image.load()

        # Iterate through each pixel of the original image
        for x in range(width):
            for y in range(height):
                # If the pixel color matches the water color, set it to white in the mask
                if image_pixels[x, y] == water_color:
                    mask_pixels[x, y] = (255, 255, 255)  # White for water
                else:
                    mask_pixels[x, y] = (0, 0, 0)  # Black for non-water

        return mask

    @staticmethod
    def generate_minecraft_style_clouds(width, height, cloud_level=50, cloud_color=(255, 255, 255, 255), block_size=20):
        """
        Generate an image with Minecraft-style square clouds on a transparent background.
        - width: The width of the image.
        - height: The height of the image.
        - cloud_level: Controls the amount of clouds (1 = few clouds, 100 = many clouds).
        - cloud_color: The RGBA color of the clouds.
        - block_size: The size of each square block used to create clouds.
        """
        # Create a new transparent image (RGBA) with a transparent background
        cloud_image = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        cloud_pixels = cloud_image.load()

        # Determine number of rows and columns of cloud blocks based on the image size and block size
        num_rows = height // block_size
        num_cols = width // block_size

        # Probability of a block being part of a cloud increases with cloud_level
        cloud_probability = cloud_level / 100

        # Generate clouds in a grid pattern
        for row in range(num_rows):
            for col in range(num_cols):
                # Randomly decide if this block should be a cloud based on cloud probability
                if np.random.rand() < cloud_probability:
                    # Draw a cloud block at this grid position
                    for dx in range(block_size):
                        for dy in range(block_size):
                            # Calculate the exact pixel position and set the cloud color
                            x = col * block_size + dx
                            y = row * block_size + dy
                            if x < width and y < height:
                                cloud_pixels[x, y] = cloud_color

        return cloud_image

    @staticmethod
    def get_assets(distance):
        planet_texture = TextureGenerator.generate_exoplanet_texture(width = 1000, height = 500, distance = distance, water_level = 40, noise_scale = 20,
        noise_contrast = 40, block_size = 40)
        water_mask = TextureGenerator.generate_water_mask(planet_texture)
        cloud_image = TextureGenerator.generate_minecraft_style_clouds(width=1000, height=500, cloud_level=60,
                                                                       block_size=40)

        response = {'planet_texture': planet_texture, 'water_mask': water_mask, 'cloud_image': cloud_image}
        return response

planet_texture, water_mask, cloud_image = TextureGenerator.get_assets(15.0)
planet_texture.save('planet_texture.png')
water_mask.save('water_mask.png')
cloud_image.save('cloud_image.png')