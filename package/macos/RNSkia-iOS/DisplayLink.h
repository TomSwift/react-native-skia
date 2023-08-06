#pragma once

#import <CoreFoundation/CoreFoundation.h>
#import <AppKit/AppKit.h>
#import <CoreVideo/CoreVideo.h>

typedef void (^block_t)(double);
@interface DisplayLink : NSObject {
  CVDisplayLinkRef _displayLink;
}

@property(nonatomic, copy) block_t updateBlock;

- (void)start:(block_t)block;

- (void)stop;

@end
