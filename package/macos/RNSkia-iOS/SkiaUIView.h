#pragma once

#import <memory>
#import <string>

#import <CoreFoundation/CoreFoundation.h>
#import <AppKit/AppKit.h>

#import <RNSkManager.h>
#import <RNSkiOSView.h>

class RNSkiOSJsView;

@interface SkiaUIView : RCTUIView

- (instancetype)
    initWithManager:(RNSkia::RNSkManager *)manager
            factory:(std::function<std::shared_ptr<RNSkBaseiOSView>(
                         std::shared_ptr<RNSkia::RNSkPlatformContext>)>)factory;

- (std::shared_ptr<RNSkBaseiOSView>)impl;

- (void)setDrawingMode:(std::string)mode;
- (void)setDebugMode:(bool)debugMode;
- (void)setNativeId:(size_t)nativeId;

@end
