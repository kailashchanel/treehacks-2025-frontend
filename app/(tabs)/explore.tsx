import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">What is an exoplanet?</ThemedText>
      </ThemedView>
      <ThemedText>An exoplanet is any planet beyond our solar system. Most exoplanets orbit other stars. Exoplanets can pass in front of, or "transit," the stars they orbit. We now know that even small backyard telescopes can detect those transits!</ThemedText>
      <Image source={require('../../assets/transit.gif')} style={{ height: 200, width: "100%" }} />
      <Collapsible title="More about exoplanet transits...">
        <ThemedText>
        When you look up into the night sky, do you wonder what's out there beyond our solar system? Come help scientists learn more about the exoplanets in our galaxy!
        </ThemedText>
        <ThemedText>
        Anyone can participate! The Watchers community teaches you everything you need to know step by step. No telescope? No problem! You can use robotic telescopes to request data to analyze even on a mobile device.
        </ThemedText>
        <ExternalLink href="https://exoplanets.nasa.gov/exoplanet-watch/about-exoplanet-watch/overview/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: 'blue',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
